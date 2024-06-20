import { Box, SimpleGrid, Image, Text, Button, VStack } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const products = [
  { id: 1, name: "Smartphone", price: "$699", image: "/images/smartphone.jpg" },
  { id: 2, name: "Laptop", price: "$999", image: "/images/laptop.jpg" },
  { id: 3, name: "Smartwatch", price: "$199", image: "/images/smartwatch.jpg" },
];

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Products = () => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const query = useQuery();

  useEffect(() => {
    const searchQuery = query.get("search")?.toLowerCase() || "";
    setFilteredProducts(
      products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery)
      )
    );
  }, [query]);

  return (
    <Box p={4}>
      <SimpleGrid columns={[1, 2, 3]} spacing={10}>
        {filteredProducts.map((product) => (
          <VStack key={product.id} spacing={4} borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
            <Image src={product.image} alt={product.name} boxSize="200px" objectFit="cover" />
            <Text fontSize="xl" fontWeight="bold">{product.name}</Text>
            <Text fontSize="lg" color="gray.500">{product.price}</Text>
            <Button as={Link} to={`/products/${product.id}`} colorScheme="teal">View Details</Button>
          </VStack>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Products;