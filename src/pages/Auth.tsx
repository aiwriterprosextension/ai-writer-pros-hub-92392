import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { LogIn, UserPlus, Star } from "lucide-react";
import { lovable } from "@/integrations/lovable/index";
import { Separator } from "@/components/ui/separator";

const reviews = [
  {
    name: "Sarah Mitchell",
    role: "Content Marketing Manager",
    text: "AI Writer Pros has completely transformed how I create content. The blog creator alone saves me 10+ hours per week. The quality is incredible and barely needs editing!",
    rating: 5,
  },
  {
    name: "James Rodriguez",
    role: "Amazon Affiliate Blogger",
    text: "The Amazon Affiliate Review tool is a game-changer. I went from publishing 2 reviews a week to 10. My affiliate income has tripled since I started using this platform.",
    rating: 5,
  },
  {
    name: "Emily Chen",
    role: "Social Media Strategist",
    text: "I manage 12 client accounts and the Social Media Suite handles them all beautifully. The AI understands each platform's tone perfectly. My clients are thrilled with engagement rates.",
    rating: 5,
  },
  {
    name: "David Thompson",
    role: "E-commerce Store Owner",
    text: "From product descriptions to email campaigns, AI Writer Pros does it all. The content repurposing feature lets me turn one blog post into a week's worth of social content.",
    rating: 5,
  },
  {
    name: "Patricia Nguyen",
    role: "SEO Content Writer",
    text: "The AI Humanizer is unbelievable — my AI-generated drafts now pass every detection tool. Combined with the SEO optimizer, my articles rank on the first page consistently.",
    rating: 5,
  },
];

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [activeReview, setActiveReview] = useState(0);
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveReview((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  if (user) {
    navigate("/dashboard");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = isSignUp
      ? await signUp(email, password)
      : await signIn(email, password);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: isSignUp ? "Account created!" : "Welcome back!" });
      navigate("/dashboard");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Reviews */}
      <div className="hidden lg:flex lg:w-3/5 bg-gradient-to-br from-blue-600 via-purple-700 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center w-full px-12 py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-2 leading-tight">
            Check Out What Our Customers<br />are Saying
          </h2>
          <p className="text-xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
              (10,000+ 5 Star Reviews)
            </span>
          </p>

          {/* Review Cards */}
          <div className="w-full max-w-2xl">
            <div className="relative h-[260px]">
              {reviews.map((review, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                    index === activeReview
                      ? "opacity-100 translate-x-0"
                      : index < activeReview
                      ? "opacity-0 -translate-x-full"
                      : "opacity-0 translate-x-full"
                  }`}
                >
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8">
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-white/90 text-lg leading-relaxed mb-6">
                      "{review.text}"
                    </p>
                    <div>
                      <p className="text-white font-semibold">{review.name}</p>
                      <p className="text-white/60 text-sm">{review.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveReview(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    index === activeReview
                      ? "w-8 bg-white"
                      : "w-2.5 bg-white/40 hover:bg-white/60"
                  }`}
                  aria-label={`View review ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="flex-1 flex items-center justify-center bg-background px-6 py-12 lg:py-0">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 mb-6">
              <div className="w-9 h-9 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <span className="font-bold text-xl text-foreground">Writer Pros</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground">
              {isSignUp ? "Get Started with 10,000 Free Words" : "Welcome Back"}
            </h1>
            <p className="text-muted-foreground mt-1">
              {isSignUp ? "No credit card required!" : "Sign in to your account"}
            </p>
          </div>

          {/* Google Button */}
          <Button
            type="button"
            variant="outline"
            className="w-full h-12 text-base"
            disabled={googleLoading}
            onClick={async () => {
              setGoogleLoading(true);
              const { error } = await lovable.auth.signInWithOAuth("google", {
                redirect_uri: window.location.origin,
              });
              if (error) {
                toast({ title: "Error", description: error.message, variant: "destructive" });
                setGoogleLoading(false);
              }
            }}
          >
            {googleLoading ? "Connecting..." : (
              <>
                <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Connect With Google
              </>
            )}
          </Button>

          {/* Divider */}
          <div className="relative">
            <Separator />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-3 text-sm text-muted-foreground">
              or Continue With
            </span>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-foreground">
                Email <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="h-12"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-foreground">
                Password <span className="text-destructive">*</span>
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="h-12"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
            <Button
              type="submit"
              className="w-full h-12 text-base bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              disabled={loading}
            >
              {loading ? "Loading..." : isSignUp ? (
                <><UserPlus className="mr-2 h-4 w-4" /> Sign Up</>
              ) : (
                <><LogIn className="mr-2 h-4 w-4" /> Sign In</>
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-primary hover:underline font-medium"
            >
              {isSignUp ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
            </button>
          </p>
        </div>
      </div>

      {/* Mobile Reviews (shown below form on small screens) */}
      <div className="lg:hidden bg-gradient-to-br from-blue-600 via-purple-700 to-indigo-900 px-6 py-12">
        <h2 className="text-2xl font-bold text-white text-center mb-2">
          What Our Customers Say
        </h2>
        <p className="text-center mb-8">
          <span className="bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent font-bold">
            (10,000+ 5 Star Reviews)
          </span>
        </p>
        <div className="space-y-4">
          {reviews.slice(0, 3).map((review, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6">
              <div className="flex gap-1 mb-3">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-white/90 text-sm mb-4">"{review.text}"</p>
              <p className="text-white font-semibold text-sm">{review.name}</p>
              <p className="text-white/60 text-xs">{review.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
