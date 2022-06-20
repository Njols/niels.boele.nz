import { useEffect, useState } from "react";
import { tarot } from "../helper/tarot";
import {
  Img,
  Box,
  Heading,
  ChakraProvider,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import Draggable from "react-draggable";
import { motion, useAnimation, useMotionValue } from "framer-motion";
import TarotCardDisplay from "../components/tarot-card-display";

export default function Home() {
  const [tarotCard, setTarotCard] = useState({});
  const [nextTarotCard, setNextTarotCard] = useState({});
  const [tarotCardTitle, setTarotCardTitle] = useState("");

  const getRandomTarotCard = () => {
    let randomIndex = Math.floor(Math.random() * 78);
    let randomCard = tarot[randomIndex];
    return randomCard ? randomCard : getRandomTarotCard();
  };

  const pullCard = () => {
    if (Object.entries(tarotCard).length === 0) {
      setTarotCard(getRandomTarotCard());
    } else {
      setTarotCard(nextTarotCard);
    }
    setNextTarotCard(getRandomTarotCard());
  };

  useEffect(() => pullCard, []);

  return (
    <Box display="flex">
      <TarotCardDisplay
        tarotCard={tarotCard}
        nextTarotCard={nextTarotCard}
        onCardLoad={() => setTarotCardTitle(tarotCard.name)}
        pullCard={pullCard}
      />
      <Box
        flexGrow={1}
        flexDir="column"
        display="flex"
        h="100vh"
        zIndex={5}
        bgColor={useColorModeValue("#f0e7db", "#202023")}
      >
        <Box justifySelf="center">
          <Heading variant="sub-title">{tarotCardTitle}</Heading>
          <Heading fontSize="6xl">Niels Boelens</Heading>
        </Box>
      </Box>
    </Box>
  );
}
