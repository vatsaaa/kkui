import React from 'react';
import { Box, Image, Text, VStack, HStack } from '@chakra-ui/react';

function RecipeCard({ recipe }) {
    return (
        <Box p={4} borderWidth="1px" borderRadius="lg" mb={4} m={2}>
            <VStack spacing={4}>
                <Image src={recipe.image} alt={recipe.name} boxSize="200px" objectFit="cover" />
                <HStack justifyContent="space-between" width="100%">
                    <Text fontSize="lg" fontWeight="bold">{recipe.name}</Text>
                    <Text>{recipe.calories} kcal</Text>
                </HStack>
                <Box>
                    <Text fontWeight="bold">Ingredients:</Text>
                    <Text>{recipe.ingredients}</Text>
                </Box>
            </VStack>
        </Box>
    );
}

export default RecipeCard;
