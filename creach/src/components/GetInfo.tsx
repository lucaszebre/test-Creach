
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function GetInfo() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Get to Know Me</CardTitle>
        <CardDescription>Please answer the following questions to help me get to know you better.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="passions">What are your passions and hobbies?</Label>
          <Textarea id="passions" placeholder="Tell us about your interests" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="family">Can you tell me about your family background?</Label>
          <Textarea id="family" placeholder="Share a bit about your family" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="work">What do you do for a living, and do you enjoy it?</Label>
          <Textarea id="work" placeholder="Describe your work and how you feel about it" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="media">What are your favorite books, movies, or TV shows?</Label>
          <Textarea id="media" placeholder="Tell us about the media you enjoy" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="travel">Have you traveled anywhere that left a lasting impression on you?</Label>
          <Textarea id="travel" placeholder="Share about a memorable travel experience" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="goals">What are your goals or aspirations in life?</Label>
          <Textarea id="goals" placeholder="Describe your dreams and ambitions" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="freetime">How do you like to spend your free time?</Label>
          <Textarea id="freetime" placeholder="Tell us how you enjoy your leisure time" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="values">What values are most important to you?</Label>
          <Textarea id="values" placeholder="Share the principles that guide your life" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="experience">Can you share a significant life experience that shaped who you are today?</Label>
          <Textarea id="experience" placeholder="Describe a formative moment in your life" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="strengths">What are your strengths and weaknesses?</Label>
          <Textarea id="strengths" placeholder="Tell us about your positive and negative traits" />
        </div>
      </CardContent>
      <CardFooter>
        <Button type="submit">Submit</Button>
      </CardFooter>
    </Card>
  )
}