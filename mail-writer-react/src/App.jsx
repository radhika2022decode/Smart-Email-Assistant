import { useState } from 'react'
import './App.css'
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import { TextField, Container, Typography, Box, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';

function App() {
  const [emailContent, setEmailContent] = useState('');
  const [tone, setTone] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setIsLoading(true);
    setError('');
    try{
      const response = await axios.post("http://localhost:8080/api/email/generate", {
        emailContent,
        tone
      });
      setGeneratedReply(typeof response.data === 'string' ? response.data : JSON.stringify(response.data));
    }catch(error){
      setError('An error occurred while generating the reply. Please try again.');
      console.error(error);
    }finally{
      setIsLoading(false);
    }
  }

  return (
    <Container maxWidth="md" sx={{py:4}}>
      <Typography variant="h4" component="h1" gutterBottom>
        Email Reply Generator
      </Typography>
      <Box sx={{mx:3}}>
        <TextField 
        fullWidth
        multiline
        rows={6}
        variant="outlined"
        label="Original Email Content"
        value={emailContent || ''}
        onChange={(e) => setEmailContent(e.target.value)}
        sx={{mb:2}}
        />

        <FormControl fullWidth sx={{mb:2}}>
          <InputLabel>
            Tone (Optional)
          </InputLabel>
          <Select
          value={tone || ''}
          label={"Tone (Optional)"}
          onChange={(e) => setTone(e.target.value)}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="professional">Professional</MenuItem>
            <MenuItem value="friendly">Friendly</MenuItem>
            <MenuItem value="humorous">Humorous</MenuItem>
            <MenuItem value="casual">Casual</MenuItem>

          </Select>
        </FormControl>
        <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={!emailContent || isLoading}
        fullWidth>
          {isLoading ? <CircularProgress size={24} /> : 'Generate Reply'}
        </Button>
      </Box>

      {error && (
        <Typography color='error' sx={{mb:2}}>
          {error}
        </Typography>
      )}
      {generatedReply && (
        <Box sx={{mt:3}}>
          <Typography variant="h6" gutterBottom>
            Generated Reply:
          </Typography>
          <TextField 
          fullWidth
          multiline
          rows={6}
          variant="outlined"
          value={generatedReply || ''}
          InputProps={{
            readOnly: true,
          }}
          />  
          <Button
          variant="outlined"
          onClick={() => navigator.clipboard.writeText(generatedReply)}
          sx={{mt:2}}
          >
            Copy to Clipboard
          </Button>
        </Box>
      )}

    </Container>
  )
}

export default App
