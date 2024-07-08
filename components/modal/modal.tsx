import {
    Button,
    Card,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Image,
    Stack,
    CardBody,
    Heading,
    Text
} from '@chakra-ui/react';
import { useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { GET_CHARACTER_QUERY } from '@/lib/characterQueries';
import { InfoOutlineIcon } from '@chakra-ui/icons';

interface DetailModalProps {
    characterId: number | null;
    isOpen: boolean;
    onClose: () => void;
}

const DetailModal: React.FC<DetailModalProps> = ({ characterId, isOpen, onClose }) => {
    // Apollo Client useQuery hook to fetch character data
    const { data, loading, error, refetch } = useQuery(GET_CHARACTER_QUERY, {
        variables: { id: characterId },
        skip: !isOpen,
    });
    // Extract character data from Apollo Client response
    const character = data?.character;

    // Effect hook to refetch data when modal opens
    useEffect(() => {
        if (isOpen) {
            refetch();
        }
    }, [isOpen, refetch]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <Modal isCentered isOpen={isOpen} onClose={onClose} motionPreset='slideInRight'>
            <ModalOverlay />
            {character && <ModalContent>
                <ModalHeader color='teal'>
                    <InfoOutlineIcon mr={2} />
                    Charaster Details
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Card
                        direction={{ base: 'column', sm: 'row' }}
                        overflow='hidden'
                        variant='outline'
                    >
                        <Image
                            objectFit='cover'
                            maxW={{ base: '100%', sm: '200px' }}
                            src={character.image}
                            alt='Character image'
                        />
                        <Stack>
                            <CardBody>
                                <Heading size='md'>{character.name}</Heading>
                                <Text py='2'>
                                    Meet {character.name}, a {character.gender} {character.species} beloved figure who is {character.status} now.
                                </Text>
                            </CardBody>
                        </Stack>
                    </Card>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='teal' mr={3} onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
            }
        </Modal >
    )
}

export default DetailModal;