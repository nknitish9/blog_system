import { fetchAllCountries, fetchCountryByName } from './api';

// Cache for storing country data
let countriesCache = null;

// Transform country data into blog post format
const transformCountryToBlogPost = (country, index) => {
  return {
    id: index,
    title: country.name.common,
    excerpt: `Discover interesting facts about ${country.name.common}`,
    content: `${country.name.common} is a beautiful country located in ${country.region}. 
              It has a population of ${country.population.toLocaleString()} people.
              The capital city is ${country.capital?.[0] || 'N/A'}.
              ${country.independent ? 'It is an independent country.' : 'It is not an independent country.'}`,
    image: country.flags.png,
    author: 'Travel Explorer',
    date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toLocaleDateString(),
    likes: Math.floor(Math.random() * 100),
    comments: [],
    tags: [country.region, 'Travel', 'Geography'],
  };
};

export const getAllBlogs = async () => {
  try {
    // Use cached data if available
    if (countriesCache) {
      return countriesCache.slice(0, 20).map(transformCountryToBlogPost);
    }
    
    const countries = await fetchAllCountries();
    // Store in cache
    countriesCache = countries;
    // Convert country data to blog posts
    return countries.slice(0, 20).map(transformCountryToBlogPost);
  } catch (error) {
    console.error('Error getting all blogs:', error);
    throw error;
  }
};

export const getBlogById = async (id) => {
  try {
    // Fetch all countries if cache is empty
    if (!countriesCache) {
      countriesCache = await fetchAllCountries();
    }
    
    const country = countriesCache[id];
    if (!country) throw new Error('Blog not found');
    return transformCountryToBlogPost(country, id);
  } catch (error) {
    console.error(`Error getting blog ${id}:`, error);
    throw error;
  }
};

export const getBlogByTitle = async (title) => {
  try {
    const country = await fetchCountryByName(title);
    return transformCountryToBlogPost(country, 0);
  } catch (error) {
    console.error(`Error getting blog with title ${title}:`, error);
    throw error;
  }
};

// Mock functions for comments and likes
export const addComment = (blogId, comment) => {
  // In a real app, this would be an API call
  console.log(`Comment added to blog ${blogId}:`, comment);
  return Promise.resolve({ success: true });
};

export const addLike = (blogId) => {
  // In a real app, this would be an API call
  console.log(`Like added to blog ${blogId}`);
  return Promise.resolve({ success: true });
};