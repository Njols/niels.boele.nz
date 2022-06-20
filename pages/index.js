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

export default function Home() {
  const [tarotCard, setTarotCard] = useState({});
  const [nextTarotCard, setNextTarotCard] = useState({});
  const [tarotCardTitle, setTarotCardTitle] = useState("");

  const [dragDistanceX, setDragDistanceX] = useState(0);
  const [draggablePosition, setDraggablePosition] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const cardControls = useAnimation();

  const getRandomTarotCard = () => {
    let randomIndex = Math.floor(Math.random() * 78);
    let randomCard = tarot[randomIndex];
    return randomCard ? randomCard : getRandomTarotCard();
  };

  const PullCard = () => {
    if (Object.entries(tarotCard).length === 0) {
      setTarotCard(getRandomTarotCard());
    } else {
      setTarotCard(nextTarotCard);
    }
    setNextTarotCard(getRandomTarotCard());
  };

  const OnCardDrag = async (e, d) => {
    setIsDragging(true);
    setDragDistanceX((dragDistanceX += d.deltaX));
    if (dragDistanceX < -150 || dragDistanceX > 150) {
      setDraggablePosition({ x: dragDistanceX, y: 0 });
      await cardControls.start({
        opacity: 0,
      });
      setDraggablePosition({ x: 0, y: 0 });
      PullCard();
      cardControls.set({ opacity: 1 });
      setDragDistanceX(0);
    }
  };

  const OnCardDragStop = () => {
    setIsDragging(false);
  };

  useEffect(() => PullCard, []);

  useEffect(() => {
    const preloadImage = document.createElement("img");
    preloadImage.src = nextTarotCard.url;
  }, [nextTarotCard]);
  return (
    <Box display="flex">
      <Box
        minW="57vh"
        bgColor={useColorModeValue("#FFFFFF", "#0A0B0B")}
        display="flex"
        justifyContent="center"
        alignItems="center"
        pos="absolute"
      >
        <Img
          src={nextTarotCard.url}
          onLoad={() => setTarotCardTitle(tarotCard.name)}
          height="100vh"
          filter="invert(61%) sepia(31%) saturate(4161%) hue-rotate(359deg) brightness(100%) contrast(102%)"
        />
      </Box>
      <motion.div animate={cardControls}>
        <Draggable
          axis="x"
          onDrag={OnCardDrag}
          onStop={OnCardDragStop}
          position={draggablePosition}
          handle="#draghandle"
        >
          <Box
            minW="57vh"
            bgColor={useColorModeValue("#FFFFFF", "#0A0B0B")}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <motion.div
              id="draghandle"
              style={{
                minHeight: "50%",
                minWidth: "50%",
                zIndex: 2,
                position: "absolute",
                cursor: isDragging ? "grabbing" : "grab",
              }}
              whileHover={{
                backgroundColor: "white",
                opacity: 0.5,
              }}
              initial={{ opacity: 0 }}
            />
            <Img
              src={tarotCard.url}
              onLoad={() => setTarotCardTitle(tarotCard.name)}
              height="100vh"
              filter="invert(61%) sepia(31%) saturate(4161%) hue-rotate(359deg) brightness(100%) contrast(102%)"
            />
          </Box>
        </Draggable>
      </motion.div>
      <Box
        flexGrow={1}
        flexDir="column"
        display="flex"
        h="100vh"
        zIndex="3"
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
