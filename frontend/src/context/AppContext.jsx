import React, { createContext, useContext, useState, useCallback } from 'react';

const AppContext = createContext();
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

export const AppProvider = ({ children }) => {
  // ── Global State ──
  const [problem, setProblem] = useState('');
  const [confidenceScore, setConfidenceScore] = useState(0);

  // ── Per-Page Data ──
  const [problemData, setProblemData] = useState(null);
  const [validationData, setValidationData] = useState(null);
  const [marketData, setMarketData] = useState(null);
  const [ideasData, setIdeasData] = useState(null);
  const [testData, setTestData] = useState(null);
  const [launchData, setLaunchData] = useState(null);

  // ── Per-Page Loading/Error ──
  const [loadingStates, setLoadingStates] = useState({});
  const [errorStates, setErrorStates] = useState({});

  // ── Selected Idea (shared across Idea + Launch pages) ──
  const [selectedIdea, setSelectedIdea] = useState(null);

  // ── Chat ──
  const [chatHistory, setChatHistory] = useState([
    { role: 'assistant', content: "Hi! I'm your AI Co-Founder. Let's build something amazing together. What problem are you trying to solve?" }
  ]);

  // ── Helper: Set loading state for a page ──
  const setPageLoading = (page, isLoading) => {
    setLoadingStates(prev => ({ ...prev, [page]: isLoading }));
  };

  const setPageError = (page, error) => {
    setErrorStates(prev => ({ ...prev, [page]: error }));
  };

  // ── Generic fetch function ──
  const fetchPageData = useCallback(async (page, problemText, setter, existingData) => {
    // Don't re-fetch if we already have data for this problem
    if (existingData && problemText === problem) return existingData;

    setPageLoading(page, true);
    setPageError(page, null);

    try {
      const response = await fetch(`${API_BASE}/${page}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ problem: problemText })
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      setter(data);

      // Update confidence from problem endpoint
      if (page === 'problem' && data.confidence_score) {
        setConfidenceScore(data.confidence_score);
      }

      return data;
    } catch (err) {
      console.error(`Error fetching /${page}:`, err);
      setPageError(page, err.message || `Failed to fetch ${page} data`);
      return null;
    } finally {
      setPageLoading(page, false);
    }
  }, [problem]);

  // ── Per-Page Fetch Functions ──

  const fetchProblemData = useCallback((problemText) => {
    const p = problemText || problem;
    setProblem(p);
    return fetchPageData('problem', p, setProblemData, null); // Always re-fetch problem
  }, [problem, fetchPageData]);

  const fetchValidationData = useCallback((problemText) => {
    const p = problemText || problem;
    return fetchPageData('validation', p, setValidationData, validationData);
  }, [problem, validationData, fetchPageData]);

  const fetchMarketData = useCallback((problemText) => {
    const p = problemText || problem;
    return fetchPageData('market', p, setMarketData, marketData);
  }, [problem, marketData, fetchPageData]);

  const fetchIdeasData = useCallback((problemText) => {
    const p = problemText || problem;
    return fetchPageData('ideas', p, setIdeasData, ideasData);
  }, [problem, ideasData, fetchPageData]);

  const fetchTestData = useCallback((problemText) => {
    const p = problemText || problem;
    return fetchPageData('test', p, setTestData, testData);
  }, [problem, testData, fetchPageData]);

  const fetchLaunchData = useCallback((problemText) => {
    const p = problemText || problem;
    return fetchPageData('launch', p, setLaunchData, launchData);
  }, [problem, launchData, fetchPageData]);

  // ── Reset all data (when user enters new problem) ──
  const resetAllData = useCallback(() => {
    setProblemData(null);
    setValidationData(null);
    setMarketData(null);
    setIdeasData(null);
    setTestData(null);
    setLaunchData(null);
    setSelectedIdea(null);
    setConfidenceScore(0);
    setErrorStates({});
  }, []);

  // ── Chat (streaming) ──
  const sendMessage = async (message) => {
    const newMessage = { role: 'user', content: message };
    setChatHistory(prev => [...prev, newMessage]);
    setChatHistory(prev => [...prev, { role: 'assistant', content: '...' }]);

    try {
      const response = await fetch(`${API_BASE}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: chatHistory.filter(m => m.content !== '...'),
          user_message: message
        })
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        assistantMessage += decoder.decode(value, { stream: true });
        setChatHistory(prev => {
          const last = prev[prev.length - 1];
          if (last.role === 'assistant') {
            return [...prev.slice(0, -1), { role: 'assistant', content: assistantMessage }];
          }
          return [...prev, { role: 'assistant', content: assistantMessage }];
        });
      }
    } catch (err) {
      console.error(err);
      setChatHistory(prev => [
        ...prev.slice(0, -1),
        { role: 'assistant', content: "Sorry, I'm having trouble connecting right now." }
      ]);
    }
  };

  // ── Legacy compatibility ──
  const analyzeProblem = fetchProblemData;
  const analysisData = problemData; // Backwards compat for components that reference analysisData

  return (
    <AppContext.Provider value={{
      // Global
      problem,
      setProblem,
      confidenceScore,

      // Per-page data
      problemData,
      validationData,
      marketData,
      ideasData,
      testData,
      launchData,

      // Per-page fetchers
      fetchProblemData,
      fetchValidationData,
      fetchMarketData,
      fetchIdeasData,
      fetchTestData,
      fetchLaunchData,
      resetAllData,

      // Loading/Error
      loadingStates,
      errorStates,

      // Idea selection
      selectedIdea,
      setSelectedIdea,

      // Chat
      chatHistory,
      sendMessage,

      // Legacy compat
      analysisData,
      analyzeProblem,
      loading: loadingStates.problem || false,
      error: errorStates.problem || null,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
