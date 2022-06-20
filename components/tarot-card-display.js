import { Box, Img, useColorModeValue } from "@chakra-ui/react";
import { motion, useAnimation } from "framer-motion";
import { useState } from "react";
import Draggable from "react-draggable";

function TarotCardDisplay(props) {
  const [dragDistanceX, setDragDistanceX] = useState(0);
  const [draggablePosition, setDraggablePosition] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const cardControls = useAnimation();

  const onCardDrag = async (e, d) => {
    setIsDragging(true);
    setDragDistanceX((dragDistanceX += d.deltaX));
    if (dragDistanceX < -150 || dragDistanceX > 150) {
      setDraggablePosition({ x: dragDistanceX, y: 0 });
      await cardControls.start({
        opacity: 0,
      });
      setDraggablePosition({ x: 0, y: 0 });
      props.pullCard();
      cardControls.set({ opacity: 1 });
      setDragDistanceX(0);
    }
  };

  const onCardDragStop = () => {
    setIsDragging(false);
  };
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
          src={props.nextTarotCard.url}
          height="100vh"
          filter="invert(61%) sepia(31%) saturate(4161%) hue-rotate(359deg) brightness(100%) contrast(102%)"
        />
      </Box>
      <motion.div animate={cardControls}>
        <Draggable
          axis="x"
          onDrag={onCardDrag}
          onStop={onCardDragStop}
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
              src={props.tarotCard.url}
              onLoad={props.onCardLoad}
              height="100vh"
              filter="invert(61%) sepia(31%) saturate(4161%) hue-rotate(359deg) brightness(100%) contrast(102%)"
            />
          </Box>
        </Draggable>
      </motion.div>
    </Box>
  );
}

export default TarotCardDisplay;
