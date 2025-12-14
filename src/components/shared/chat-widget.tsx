'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  X,
  Loader,
  Bot,
  ExternalLink,
  Phone,
  Instagram,
  Facebook,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { aiChatAssistant, type AIChatAssistantOutput } from '@/ai/flows/ai-chat-assistant';
import Logo from './logo';

const getIconForReply = (label: string) => {
  const lowerCaseLabel = label.toLowerCase();
  if (lowerCaseLabel.includes('whatsapp')) {
    // Lucide doesn't have a dedicated WhatsApp icon, using a generic chat icon.
    return <MessageSquare className="mr-2 h-4 w-4" />;
  }
  if (lowerCaseLabel.includes('instagram')) {
    return <Instagram className="mr-2 h-4 w-4" />;
  }
  if (lowerCaseLabel.includes('call')) {
    return <Phone className="mr-2 h-4 w-4" />;
  }
  if (lowerCaseLabel.includes('facebook')) {
    return <Facebook className="mr-2 h-4 w-4" />;
  }
  return <ExternalLink className="mr-2 h-4 w-4 text-muted-foreground" />;
};


export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [replies, setReplies] = useState<AIChatAssistantOutput['smartReplies']>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && replies.length === 0 && !isLoading) {
      setIsLoading(true);
      setError(null);
      aiChatAssistant({})
        .then((output) => {
          if (output?.smartReplies) {
            setReplies(output.smartReplies);
          } else {
             setError('Could not load suggestions.');
          }
        })
        .catch((err) => {
          console.error('Error fetching chat assistant replies:', err);
          setError('Failed to get suggestions. Please try again.');
        })
        .finally(() => setIsLoading(false));
    }
  }, [isOpen, replies.length, isLoading]);

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="absolute bottom-[calc(100%+1rem)] right-0 w-80"
            >
              <Card className="shadow-2xl">
                <CardHeader className="flex flex-row items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground">
                    <Bot className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="font-headline text-lg">Swan AI</CardTitle>
                    <CardDescription>How can we help you?</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="flex items-center justify-center p-8">
                      <Loader className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : error ? (
                     <div className="text-center text-sm text-destructive p-4">
                        {error}
                     </div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      {replies.map((reply) => (
                        <Button
                          key={reply.label}
                          variant="outline"
                          asChild
                          className="justify-start"
                        >
                          <a href={reply.url} target="_blank" rel="noopener noreferrer">
                            {getIconForReply(reply.label)}
                            <span>{reply.label}</span>
                            <ExternalLink className="ml-auto h-4 w-4 text-muted-foreground" />
                          </a>
                        </Button>
                      ))}
                    </div>
                  )}
                </CardContent>
                <CardFooter className='justify-center'>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    Powered by <Logo width={60} height={20} />
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <Button
          size="icon"
          className="h-16 w-16 rounded-full shadow-lg"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close chat' : 'Open chat'}
        >
          <AnimatePresence>
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                exit={{ rotate: 90, scale: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-8 w-8" />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ rotate: 90, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                exit={{ rotate: -90, scale: 0 }}
                transition={{ duration: 0.2 }}
              >
                <MessageSquare className="h-8 w-8" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </div>
    </>
  );
}
