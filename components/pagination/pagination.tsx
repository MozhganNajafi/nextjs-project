import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons';
import { Button, Flex, Spacer } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { getCharacterTotalPages } from '@/lib/characterQueries';
interface PaginationProps {
    onAction: (newPageNumber: number) => void;
    pageNumber: number;
}

const Pagination: React.FC<PaginationProps> = ({ onAction, pageNumber }) => {
    const [isPreviousDisabled, setIsPreviousDisabled] = useState(true);
    const [isNextDisabled, setIsNextDisabled] = useState(false);
    const [newPageNumber, setNewPageNumber] = useState(pageNumber);
    const [totalPages, setTotalPages] = useState<number>(50);

    // Effect hook to manage button disable states based on current page number and total pages
    useEffect(() => {
        if (pageNumber !== 1) {
            setIsPreviousDisabled(false);
        } else {
            setIsPreviousDisabled(true);
        }
        if (pageNumber === totalPages) {
            setIsNextDisabled(true);
        } else {
            setIsNextDisabled(false);
        }
    }, [pageNumber, totalPages]);

    // Effect hook to fetch total number of pages when component mounts
    useEffect(() => {
        const fetchTotalPages = async () => {
            const responseTotalPages = await getCharacterTotalPages();
            if (responseTotalPages.status === 200) {
                setTotalPages(responseTotalPages.data.characters.info.pages);
            }
        }
        fetchTotalPages();
    }, []);

    // Effect hook to trigger onAction function when newPageNumber changes
    useEffect(() => {
        onAction(newPageNumber);
    }, [newPageNumber, onAction]);

    // Function to handle click events for previous and next buttons
    const clickHandler = (navDirection: string) => {
        if (navDirection === 'next' && !isNextDisabled) {
            setNewPageNumber(pageNumber + 1);
        } else if (navDirection === 'previous' && !isPreviousDisabled) {
            setNewPageNumber(pageNumber - 1);
        }
    }

    return (
        <Flex mt={4}>
            <Button leftIcon={<ChevronLeftIcon />} colorScheme='teal' variant='solid' onClick={() => clickHandler('previous')} isDisabled={isPreviousDisabled}>
                Previous
            </Button>
            <Spacer />
            <Button rightIcon={<ChevronRightIcon />} colorScheme='teal' variant='outline' onClick={() => clickHandler('next')} isDisabled={isNextDisabled}>
                Next
            </Button>
        </Flex>
    );

}

export default Pagination;