import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Login component mounted");
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session ? "Has session" : "No session");
      if (session) {
        // Check if user is an admin
        const { data: adminUser, error: adminError } = await supabase
          .from('admin_users')
          .select(`
            *,
            role:admin_roles(
              name,
              level
            )
          `)
          .eq('profile_id', session.user.id)
          .eq('is_active', true)
          .single();

        if (adminError) {
          console.error("Error checking admin status:", adminError);
          toast({
            title: "Error",
            description: "Failed to verify admin access. Please try again.",
            variant: "destructive"
          });
          await supabase.auth.signOut();
          return;
        }

        if (!adminUser) {
          console.log("User is not an admin");
          toast({
            title: "Access Denied",
            description: "This login is restricted to admin users only.",
            variant: "destructive"
          });
          await supabase.auth.signOut();
          return;
        }

        // Update last login timestamp
        const { error: updateError } = await supabase
          .from('admin_users')
          .update({ last_login: new Date().toISOString() })
          .eq('id', adminUser.id);

        if (updateError) {
          console.error("Error updating last login:", updateError);
        }

        console.log("Admin login successful:", adminUser);
        toast({
          title: "Welcome",
          description: `Logged in as ${adminUser.role.name}`,
        });

        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const loginWithDemo = async () => {
    try {
      console.log("Attempting demo login...");
      
      // First try to create the demo user
      const { error: signUpError } = await supabase.auth.signUp({
        email: "demo@admin.com",
        password: "demo1234",
      });

      if (signUpError && signUpError.message !== "User already registered") {
        console.error("Sign up error:", signUpError);
        toast({
          title: "Error",
          description: signUpError.message,
          variant: "destructive"
        });
        return;
      }

      // Clear any existing sessions first
      await supabase.auth.signOut();
      
      // Now try to sign in
      const { data, error } = await supabase.auth.signInWithPassword({
        email: "demo@admin.com",
        password: "demo1234",
      });

      if (error) {
        console.error("Login error details:", {
          message: error.message,
          status: error.status,
          name: error.name,
          code: error.message,
          body: error.message
        });
        
        let errorMessage = "Invalid login credentials. ";
        if (error.message.includes("invalid_credentials")) {
          errorMessage += "Please make sure you have created the demo account in Supabase with email: demo@admin.com and password: demo1234";
        } else {
          errorMessage += error.message;
        }
        
        toast({
          title: "Login Failed",
          description: errorMessage,
          variant: "destructive"
        });
        return;
      }

      console.log("Demo login successful:", data);
      toast({
        title: "Success",
        description: "Logged in successfully",
      });

    } catch (err) {
      console.error("Unexpected error during login:", err);
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred";
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Admin Panel</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertDescription className="text-sm">
              Demo Admin Credentials:
              <br />
              Email: demo@admin.com
              <br />
              Password: demo1234
            </AlertDescription>
          </Alert>
          <Button 
            className="w-full"
            onClick={loginWithDemo}
          >
            Login with Demo Account
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            providers={[]}
            theme="light"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;