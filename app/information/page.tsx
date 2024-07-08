'use client';
import { Container, HStack, ListItem, UnorderedList, Image, Heading, Text, useBreakpointValue } from '@chakra-ui/react';
import ApolloProviderWrapper from '@/lib/ApolloProvider';
import { Character } from './intefaces';
import { getCharacters } from '@/lib/characterQueries';
import { useEffect, useState } from 'react';
import DetailModal from '@/components/modal/modal';
import { useSearchParams, useRouter } from 'next/navigation';
import Pagination from '@/components/pagination/pagination';
import styles from "../page.module.css";

const InformationPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageNumber = parseInt(searchParams.get('page') ?? "1", 10);

  const spacing = useBreakpointValue({ base: '2px', sm: '4px', md: '6px', lg: '10px' });
  const headingSize = useBreakpointValue({ base: 'sm', md: 'md' });

  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [characterId, setCharacterId] = useState<number | null>(null);

  // Effect hook to fetch characters whenever the page number changes
  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      try {
        const response = await getCharacters(pageNumber);
        if (response.status === 200) {
          setCharacters(response.data.characters.results);
        } else {
          setError(response.statusMessage);
        }
      } catch (err) {
        setError('Failed to fetch characters');
      } finally {
        setLoading(false);
      }
    };
    fetchCharacters();
  }, [pageNumber]);

  // Function to open the modal and set the selected character ID
  const handleOpenModal = (id: number) => {
    setShowModal(true);
    setCharacterId(id);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Function to handle pagination and navigate to the selected information page
  const paginationHandler = (newPageNumber: number) => {

    const url = new URL(window.location.href);
    url.searchParams.set('page', newPageNumber.toString());
    router.push(url.pathname + url.search);
  }

  // Display loading message while fetching data
  if (loading) {
    return <p>Loading...</p>;
  }

  // Display error message if there is an error
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Container>
      <HStack className={styles.listContainer} spacing={spacing} wrap="wrap">
        <Heading as='h4' size={headingSize}>Name</Heading>
        <Heading as='h4' size={headingSize}>Status</Heading>
        <Heading as='h4' size={headingSize}>Species</Heading>
        <Heading as='h4' size={headingSize}>Gender</Heading>
        <Heading as='h4' size={headingSize}>Image</Heading>
      </HStack>
      <UnorderedList styleType="none" ms={0}>
        {characters.map((character) => (
          <ListItem
            className={styles.list}
            cursor='pointer'
            _hover={{ background: "#e9f7ef" }}
            onClick={() => handleOpenModal(character.id)} key={character.id}>
            <HStack justify={'space-between'}>
              <Text fontSize={{ base: 'sm', md: 'md' }}>{character.name}</Text>
              <Text fontSize={{ base: 'sm', md: 'md' }}>{character.status}</Text>
              <Text fontSize={{ base: 'sm', md: 'md' }}>{character.species}</Text>
              <Text fontSize={{ base: 'sm', md: 'md' }}>{character.gender}</Text>
              <Image
                boxSize={{ base: '50px', sm: '75px', md: '100px' }}
                objectFit='cover'
                src={character.image}
                alt={character.name}
              />
            </HStack>
          </ListItem>
        ))}
      </UnorderedList>
      <Pagination onAction={paginationHandler} pageNumber={pageNumber} />
      <DetailModal isOpen={showModal} onClose={handleCloseModal} characterId={characterId} />
    </Container>
  );
};

const WrappedInformationPage = () => (
  <ApolloProviderWrapper>
    <InformationPage />
  </ApolloProviderWrapper>
);

export default WrappedInformationPage;
