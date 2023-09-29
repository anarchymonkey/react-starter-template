import React, { Profiler, ProfilerOnRenderCallback, createContext, useMemo } from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';

const themeModes = {
  dark: createTheme({
    palette: {
      mode: 'dark',
      text: {
        primary: '#FBFCFE',
        secondary: '#FBFCFE',
      },
      background: {
        default: '#080F1C',
        paper: '#080F1C',
      },
      primary: {
        dark: '#8E6929',
        main: '#8E6929',
      },
      secondary: {
        dark: '#70C841',
        main: '#70C841',
      },
    },
  }),
  light: createTheme({
    palette: {
      mode: 'light',
      text: {
        primary: '#010204',
        secondary: '#010204',
      },
      background: {
        default: '#E3EAF7',
        paper: '#E3EAF7',
      },
      primary: {
        light: '#D6B171',
        main: '#8E6929',
      },
      secondary: {
        light: '#66BE37',
        main: '#66BE37',
      },
    },
  }),
};

export const ThemeContext = createContext({
  currentMode: 'dark',
  onModeChange: (mode: 'light' | 'dark') => console.log({ mode }),
});

const queryClient = new QueryClient();
const App = () => {
  const [mode, setMode] = React.useState<'light' | 'dark'>('dark');

  const onModeChange = (newMode: 'light' | 'dark') => {
    setMode(newMode);
  };

  const fallbackRender = ({ error, resetErrorBoundary }: FallbackProps) => {
    return (
      <div>
        <h1>An error occurred</h1>
        <p>{error.message}</p>
        <button onClick={() => resetErrorBoundary()}>Try again</button>
      </div>
    );
  };

  const onRender: ProfilerOnRenderCallback = (
    id: string,
    phase: string,
    actualDuration: number,
    baseDuration: number,
    startTime: number,
    commitTime: number,
  ) => {
    console.debug({
      id,
      phase,
      actualDuration,
      baseDuration,
      startTime,
      commitTime,
    });
  };

  const getThemeContextValue = useMemo(
    () => ({
      currentMode: mode,
      onModeChange,
    }),
    [mode],
  );

  return (
    <Profiler id="app" onRender={onRender}>
      <ErrorBoundary fallbackRender={fallbackRender}>
        <ThemeContext.Provider value={getThemeContextValue}>
          <ThemeProvider theme={themeModes[mode]}>
            <CssBaseline />
            <BrowserRouter>
              <QueryClientProvider client={queryClient}>
                <div>This is a basic page layout</div>
              </QueryClientProvider>
            </BrowserRouter>
          </ThemeProvider>
        </ThemeContext.Provider>
      </ErrorBoundary>
    </Profiler>
  );
};

export default App;
