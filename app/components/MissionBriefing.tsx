'use client';

import { Panel } from './ui';
import { motion } from 'framer-motion';

interface MissionBriefingProps {
  title: string;
  content: string | string[];
}

export default function MissionBriefing({ title, content }: MissionBriefingProps) {
  const items = Array.isArray(content) ? content : [content];
  
  // Helper function to render text with bold markdown support
  const renderText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i}>{part.replace(/\*\*/g, '')}</strong>;
      }
      return <span key={i}>{part}</span>;
    });
  };
  
  // Group consecutive list items
  const processedItems: Array<{ type: 'heading' | 'subheading' | 'list' | 'paragraph'; content: string | string[] }> = [];
  let currentList: string[] = [];
  
  items.forEach((item) => {
    if (item.startsWith('- ')) {
      currentList.push(item);
    } else {
      if (currentList.length > 0) {
        processedItems.push({ type: 'list', content: currentList });
        currentList = [];
      }
      if (item.startsWith('# ')) {
        processedItems.push({ type: 'heading', content: item });
      } else if (item.startsWith('## ')) {
        processedItems.push({ type: 'subheading', content: item });
      } else {
        processedItems.push({ type: 'paragraph', content: item });
      }
    }
  });
  
  // Add any remaining list items
  if (currentList.length > 0) {
    processedItems.push({ type: 'list', content: currentList });
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      <Panel variant="elevated" headerVariant="default" title={title}>
        <div className="space-y-4">
          {processedItems.map((item, index) => {
            if (item.type === 'heading') {
              return (
                <h2 key={index} className="text-2xl font-bold text-text font-mono mb-4">
                  {(item.content as string).replace(/^# /, '')}
                </h2>
              );
            }
            if (item.type === 'subheading') {
              return (
                <h3 key={index} className="text-xl font-bold text-text font-mono mt-6 mb-3">
                  {(item.content as string).replace(/^## /, '')}
                </h3>
              );
            }
            if (item.type === 'list') {
              return (
                <ul key={index} className="space-y-2 ml-6 list-disc">
                  {(item.content as string[]).map((listItem, liIndex) => (
                    <li key={liIndex} className="text-lg leading-relaxed text-text font-mono">
                      {renderText(listItem.replace(/^- /, ''))}
                    </li>
                  ))}
                </ul>
              );
            }
            // Regular paragraph
            return (
              <p key={index} className="text-lg leading-relaxed text-text font-mono">
                {renderText(item.content as string)}
              </p>
            );
          })}
        </div>
      </Panel>
    </motion.div>
  );
}

