import { Box, Image, Text, VStack, Button } from "@chakra-ui/react";
import { useParams, Link } from "react-router-dom";

const products = [
  { id: 1, name: "Smartphone", price: "$699", description: "Latest model with advanced features", image: "/images/smartphone.jpg" },
  { id: 2, name: "Laptop", price: "$999", description: "High performance laptop for all your needs", image: "/images/laptop.jpg" },
  { id: 3, name: "Smartwatch", price: "$199", description: "Smartwatch with multiple health tracking features", image: "/images/smartwatch.jpg" },
];

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return <Text>Product not found</Text>;
  }

  return (
    <Box p={4}>
      <VStack spacing={4} borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
        <Image src={product.image} alt={product.name} boxSize="300px" objectFit="cover" />
        <Text fontSize="2xl" fontWeight="bold">{product.name}</Text>
        <Text fontSize="xl" color="gray.500">{product.price}</Text>
        <Text fontSize="md">{product.description}</Text>
        <Button as={Link} to="/products" colorScheme="teal">Back to Products</Button>
      </VStack>
    </Box>
  );
};

export default ProductDetail;