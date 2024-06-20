import { Box, SimpleGrid, Image, Text, Button, VStack, Checkbox, CheckboxGroup, Stack, RangeSlider, RangeSliderTrack, RangeSliderFilledTrack, RangeSliderThumb, Heading } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const products = [
  { id: 1, name: "Smartphone", price: 699, brand: "BrandA", category: "Electronics", image: "/images/smartphone.jpg" },
  { id: 2, name: "Laptop", price: 999, brand: "BrandB", category: "Electronics", image: "/images/laptop.jpg" },
  { id: 3, name: "Smartwatch", price: 199, brand: "BrandA", category: "Wearables", image: "/images/smartwatch.jpg" },
];

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Products = () => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const query = useQuery();

  useEffect(() => {
    const searchQuery = query.get("search")?.toLowerCase() || "";
    const filtered = products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery);
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchesSearch && matchesBrand && matchesCategory && matchesPrice;
    });
    setFilteredProducts(filtered);
  }, [query, selectedBrands, selectedCategories, priceRange]);

  const handleBrandChange = (brands) => {
    setSelectedBrands(brands);
  };

  const handleCategoryChange = (categories) => {
    setSelectedCategories(categories);
  };

  const handlePriceChange = (val) => {
    setPriceRange(val);
  };

  return (
    <Box p={4}>
      <Heading as="h2" size="lg" mb={4}>Filter Products</Heading>
      <Box mb={4}>
        <Text mb={2}>Brand</Text>
        <CheckboxGroup onChange={handleBrandChange}>
          <Stack spacing={2} direction="column">
            <Checkbox value="BrandA">BrandA</Checkbox>
            <Checkbox value="BrandB">BrandB</Checkbox>
          </Stack>
        </CheckboxGroup>
      </Box>
      <Box mb={4}>
        <Text mb={2}>Category</Text>
        <CheckboxGroup onChange={handleCategoryChange}>
          <Stack spacing={2} direction="column">
            <Checkbox value="Electronics">Electronics</Checkbox>
            <Checkbox value="Wearables">Wearables</Checkbox>
          </Stack>
        </CheckboxGroup>
      </Box>
      <Box mb={4}>
        <Text mb={2}>Price Range</Text>
        <RangeSlider defaultValue={[0, 1000]} min={0} max={1000} step={50} onChangeEnd={handlePriceChange}>
          <RangeSliderTrack>
            <RangeSliderFilledTrack />
          </RangeSliderTrack>
          <RangeSliderThumb index={0} />
          <RangeSliderThumb index={1} />
        </RangeSlider>
        <Text mt={2}>${priceRange[0]} - ${priceRange[1]}</Text>
      </Box>
      <SimpleGrid columns={[1, 2, 3]} spacing={10}>
        {filteredProducts.map((product) => (
          <VStack key={product.id} spacing={4} borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
            <Image src={product.image} alt={product.name} boxSize="200px" objectFit="cover" />
            <Text fontSize="xl" fontWeight="bold">{product.name}</Text>
            <Text fontSize="lg" color="gray.500">${product.price}</Text>
            <Button as={Link} to={`/products/${product.id}`} colorScheme="teal">View Details</Button>
          </VStack>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Products;