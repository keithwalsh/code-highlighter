import React, { useState, useEffect } from 'react';
import { Box, TextField, Paper, Typography, FormControlLabel, Switch } from '@mui/material';
import CodeHighlighter from './CodeHighlighter';

const CodeEditor: React.FC = () => {
  const [markdown, setMarkdown] = useState<string>(
`\`\`\`php title="simple.php"
<?php
echo "Hello World";
?>
\`\`\`
`);
  
  const [extractedCode, setExtractedCode] = useState<{ 
    code: string, 
    language: string,
    title?: string 
  }>({
    code: '',
    language: 'javascript',
    title: undefined
  });

  const [showLineNumbers, setShowLineNumbers] = useState(true);

  useEffect(() => {
    // Extract code blocks from markdown with improved regex
    const codeBlockRegex = /```(?:([\w+-]*)\s*)?(?:title="([^"]*)")?\n([\s\S]*?)```/;
    const match = markdown.match(codeBlockRegex);
    
    console.log('===== CODE EXTRACTION DEBUG =====');
    console.log('Input markdown:', JSON.stringify(markdown));
    console.log('Regex match result:', match);
    
    if (match) {
      const language = match[1] ? match[1].trim() : 'plaintext';
      const title = match[2] || undefined;
      const code = match[3];
      console.log('Extracted language:', JSON.stringify(language));
      console.log('Extracted title:', JSON.stringify(title));
      console.log('Extracted code:', JSON.stringify(code));
      console.log('Code length:', code.length);
      console.log('Code lines:', code.split('\n'));
      setExtractedCode({ code, language, title });
    } else {
      console.log('No match found - using defaults');
      setExtractedCode({ code: '', language: 'plaintext', title: undefined });
    }
    console.log('=================================');
  }, [markdown]);

  const handleMarkdownChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMarkdown(event.target.value);
  };

  const handleLineNumberToggle = () => {
    setShowLineNumbers(!showLineNumbers);
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 3, height: '100vh', width: '100vw' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" component="h1">
          Code Highlighter
        </Typography>
        <FormControlLabel
          control={<Switch checked={showLineNumbers} onChange={handleLineNumberToggle} />}
          label="Show Line Numbers"
        />
      </Box>
      
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', md: 'row' }, 
        gap: 2,
        height: 'calc(100% - 80px)'
      }}>
        <Box sx={{ 
          width: { xs: '100%', md: '50%' }, 
          height: '100%' 
        }}>
          <Paper 
            elevation={3} 
            sx={{ 
              height: '100%', 
              p: 0, 
              borderRadius: 1,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <TextField
              label="Markdown Input"
              multiline
              fullWidth
              variant="outlined"
              value={markdown}
              onChange={handleMarkdownChange}
              sx={{ 
                flexGrow: 1,
                '& .MuiInputBase-root': {
                  fontFamily: 'monospace',
                  height: '100%',
                  alignItems: 'flex-start'
                },
                '& .MuiInputBase-input': {
                  overflow: 'auto',
                  height: '100% !important'
                }
              }}
            />
          </Paper>
        </Box>
        <Box sx={{ 
          width: { xs: '100%', md: '50%' }, 
          height: '100%'
        }}>
          <CodeHighlighter 
            code={extractedCode.code} 
            language={extractedCode.language} 
            showLineNumbers={showLineNumbers}
            title={extractedCode.title}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default CodeEditor; 