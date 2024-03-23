import { useContext, useRef, useState } from "react";

import { ChallengesContext } from "../store/challenges-context.jsx";
import Modal from "./Modal.jsx";
import images from "../assets/images.js";

import { motion, useAnimate, stagger } from "framer-motion";

export default function NewChallenge({ onDone }) {
  const title = useRef();
  const description = useRef();
  const deadline = useRef();

  const [scope, animate] = useAnimate();
  const [selectedImage, setSelectedImage] = useState(null);
  const { addChallenge } = useContext(ChallengesContext);

  function handleSelectImage(image) {
    setSelectedImage(image);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const challenge = {
      title: title.current.value,
      description: description.current.value,
      deadline: deadline.current.value,
      image: selectedImage,
    };

    if (
      !challenge.title.trim() ||
      !challenge.description.trim() ||
      !challenge.deadline.trim() ||
      !challenge.image
    ) {
      animate(
        "input,textarea",
        { x: [-10, 0, 10, 0] },
        { type: "spring", duration: 0.2, delay: stagger(0.05) }
      );

      return;
    }

    onDone();
    addChallenge(challenge);
  }

  return (
    <Modal title="New Challenge" onClose={onDone}>
      <form id="new-challenge" onSubmit={handleSubmit} ref={scope}>
        <p>
          <label htmlFor="title">Title</label>
          <input ref={title} type="text" name="title" id="title" />
        </p>

        <p>
          <label htmlFor="description">Description</label>
          <textarea ref={description} name="description" id="description" />
        </p>

        <p>
          <label htmlFor="deadline">Deadline</label>
          <input ref={deadline} type="date" name="deadline" id="deadline" />
        </p>

        <motion.ul
          variants={{
            visible: { transition: { staggerChildren: 0.1, type: "spring" } },
          }}
          id="new-challenge-images"
        >
          {images.map((image) => (
            // using variant properties here
            <motion.li
              variants={{
                visible: { opacity: 1, y: 0 },
                hidden: { opacity: 0, y: 30 },
              }}
              /*{
              overriding variant properties here if we assign key name  then animation won't work
              we have to assign value like this in ex:- exit prop }*/
              exit={{ opacity: 1, y: 0 }}
              transition={{ type: "spring" }}
              key={image.alt}
              onClick={() => handleSelectImage(image)}
              className={selectedImage === image ? "selected" : undefined}
            >
              <img {...image} />
            </motion.li>
          ))}
        </motion.ul>

        <p className="new-challenge-actions">
          <button type="button" onClick={onDone}>
            Cancel
          </button>
          <button>Add Challenge</button>
        </p>
      </form>
    </Modal>
  );
}

/* we can background color property also

we can add keyframes also [] in array if you give values then it will count as key frames

for ex:- scale: [0.3,0.5,0.7,1]
so value can be set i  key frames like this according to our values the animation will scale

*/
