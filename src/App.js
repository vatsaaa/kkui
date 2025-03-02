import React, { useState } from 'react';
import { ChakraProvider, Box, Input, Button, VStack, Text, Flex, Link, Fade, useColorMode } from '@chakra-ui/react';
import LoginPage from './LoginPage';
import RecipeCard from './RecipeCard';

function App() {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [results, setResults] = useState([]);
    const [showLogin, setShowLogin] = useState(false);
    const [fadeOut, setFadeOut] = useState(false);
    const { colorMode, toggleColorMode } = useColorMode();

    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        if (value.length > 2) {
            fetchSuggestions(value);
        } else {
            setSuggestions([]);
            setResults([]); // Clear results when input is cleared
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const fetchSuggestions = async (query) => {
        if (process.env.NODE_ENV === 'development') {
            // Mock API call for suggestions
            const mockSuggestions = ['Pizza', 'Pasta', 'Pancakes', 'Pudding'];
            const filteredSuggestions = mockSuggestions.filter(item => item.toLowerCase().includes(query.toLowerCase()));
            setSuggestions(filteredSuggestions);
        } else {
            // Real API call for suggestions
            try {
                const response = await fetch(`/api/suggestions?query=${query}`);
                const data = await response.json();
                setSuggestions(data);
            } catch (error) {
                console.error('Error fetching suggestions:', error);
            }
        }
    };

    const handleSearch = () => {
        if (query) {
            searchRecipes(query);
        }
    };

    const searchRecipes = async (query) => {
        if (process.env.NODE_ENV === 'development') {
            // Mock API call for searching recipes
            const mockResults = [
                { name: 'Pizza', ingredients: 'Flour, Cheese, Tomato Sauce', recipe: 'Bake at 200C for 20 minutes', image: '/path/to/pizza.jpg', calories: 300 },
                { name: 'Pasta', ingredients: 'Pasta, Tomato Sauce, Cheese', recipe: 'Boil pasta and mix with sauce', image: '/path/to/pasta.jpg', calories: 250 }
            ];
            const filteredResults = mockResults.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
            setResults(filteredResults);
        } else {
            // Real API call for searching recipes
            try {
                const response = await fetch(`/api/recipes?query=${query}`);
                const data = await response.json();
                setResults(data);
            } catch (error) {
                console.error('Error searching recipes:', error);
            }
        }
    };

    const handleLoginClick = () => {
        setFadeOut(true);
        setTimeout(() => {
            setShowLogin(true);
            setFadeOut(false);
        }, 300); // Adjust the timeout duration to match the fade-out duration
    };

    return (
        <ChakraProvider>
            <Box position="absolute" top="10px" right="10px" display="flex" alignItems="center">
                <Link href="#" color="teal.500" onClick={handleLoginClick}>Login</Link>
                <Button
                    ml={2}
                    onClick={toggleColorMode}
                    aria-label="Toggle color mode"
                >
                    {colorMode === 'light' ? 'Dark Mode' : 'Light Mode'}
                </Button>
            </Box>
            <Fade in={showLogin}>
                {showLogin && <LoginPage onClose={() => setShowLogin(false)} />}
            </Fade>
            <Flex height="100vh" alignItems="center" justifyContent="center" bg={showLogin ? 'rgba(0, 0, 0, 0.5)' : 'transparent'} style={{ opacity: fadeOut ? 0.2 : 1, transition: 'opacity 0.5s' }}>
                <Box textAlign="center" p={5}>
                    <VStack spacing={4} mt={5}>
                        {!showLogin && (
                            <Box display="flex" style={{ opacity: fadeOut ? 0.2 : 1, transition: 'opacity 0.5s' }}>
                                <Input
                                    value={query}
                                    onChange={handleInputChange}
                                    onKeyPress={handleKeyPress} // Add event listener for Enter key
                                    placeholder="Search for recipes..."
                                    width="300px"
                                />
                                <Button onClick={handleSearch} ml={2} style={{ opacity: fadeOut ? 0.2 : 1, transition: 'opacity 0.5s' }}>Ki Khaawaan!</Button>
                            </Box>
                        )}
                        <Box>
                            {suggestions.map((item, index) => (
                                <Text key={index} onClick={() => setQuery(item)} cursor="pointer">
                                    {item}
                                </Text>
                            ))}
                        </Box>
                        <Flex wrap="wrap" justifyContent="center">
                            {results.map((item, index) => (
                                <RecipeCard key={index} recipe={item} />
                            ))}
                        </Flex>
                    </VStack>
                </Box>
            </Flex>
        </ChakraProvider>
    );
}

export default App;
