'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { generateDescriptionAction } from '@/app/actions';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Wand2, Copy, Check } from 'lucide-react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Generating...' : <><Wand2 className="mr-2 h-4 w-4" /> Generate Description</>}
    </Button>
  );
}

export function ProjectDescriptionGenerator() {
  const initialState = { message: '', summary: '' };
  const [state, formAction] = useActionState(generateDescriptionAction, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (state.message && state.message !== 'success') {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: state.message,
      });
    }
    if (state.message === 'success') {
        formRef.current?.reset();
    }
  }, [state, toast]);

  const handleCopy = () => {
    if (state.summary) {
        navigator.clipboard.writeText(state.summary);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="mt-16 pt-16 border-t">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">AI Project Assistant</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Have a project on GitHub, GitLab, or another public repository? Paste the URL to get an AI-generated summary.
            </p>
        </div>
      </div>
      <Card className="max-w-2xl mx-auto mt-12">
        <CardHeader>
          <CardTitle>Generate Project Description</CardTitle>
          <CardDescription>Enter a public project URL to summarize its purpose.</CardDescription>
        </CardHeader>
        <form ref={formRef} action={formAction}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="project-url">Project URL</Label>
              <Input
                id="project-url"
                name="projectUrl"
                placeholder="https://github.com/user/repo"
                required
                type="url"
              />
              {state.errors?.projectUrl && <p className="text-sm font-medium text-destructive">{state.errors.projectUrl[0]}</p>}
            </div>
            {state.summary && (
              <div className="space-y-2 relative">
                <Label htmlFor="summary">Generated Summary</Label>
                <Textarea id="summary" value={state.summary} readOnly rows={5} className="bg-muted" />
                <Button type="button" size="icon" variant="ghost" className="absolute top-6 right-1" onClick={handleCopy}>
                    {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
