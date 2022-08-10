const pixelMoveContainerAmount = -900;

export const containerVariants = {
  hidden: {
    // x: `${pixelMoveContainerAmount}px`,
    scale: 0.8,
    opacity: 0,
  },
  visible: {
    // x: 0,
    scale: 1,
    opacity: 1,
    transition: { duration: 0.2 },
  },
  exit: {
    // x: `-${pixelMoveContainerAmount}px`,
    opacity: 0,
    scale: 0.8,
    transition: { ease: "easeInOut", duration: 0.15 },
  },
};

export const errorModalVariants = {
  hidden: {
    y: `${pixelMoveContainerAmount}px`,
    scale: 0.4,
    opacity: 0,
  },
  visible: {
    y: 0,
    scale: 1,
    opacity: 1,
    transition: { duration: 0.3 },
  },
  exit: {
    y: `-${pixelMoveContainerAmount}px`,
    opacity: 0,
    scale: 0.4,
    transition: { ease: "easeInOut", duration: 0.3 },
  },
};

// export const linksHoverVariants = {
//   hidden: {
//     opacity: 0,
//     x: -50,
//     scale: 0.98,
//   },
//   visible: {
//     x: 0,
//     scale: 1,
//     opacity: 1,
//     transition: {
//       duration: 0.2,
//       delay: 0.05,
//       type: "spring",
//       stiffness: 100,
//       staggerChildren: 0.4,
//     },
//   },
//   hover: {
//     scale: 1.05,
//     transition: { duration: 0.15 },
//   },
// };

// export const logoHoverVariants = {
//   hidden: {
//     opacity: 0,
//     x: -50,
//     scale: 0.5,
//   },
//   visible: {
//     x: 0,
//     scale: 1,
//     opacity: 1,
//     transition: {
//       duration: 0.2,
//       delay: 0.2,
//       type: "spring",
//       stiffness: 100,
//       staggerChildren: 0.1,
//     },
//   },
//   hover: {
//     scale: 1.1,
//     transition: { duration: 0.1, type: "spring", stiffness: 700 },
//   },
// };

// export const iconsContainerVariants = {
//   hidden: {
//     opacity: 0,
//     x: -50,
//     scale: 0.98,
//   },
//   visible: {
//     x: 0,
//     scale: 1,
//     opacity: 1,
//     transition: {
//       duration: 0.2,
//       delay: 0.02,
//       type: "spring",
//       stiffness: 100,
//     },
//   },
// };

// export const iconsItemVariants = {
//   hidden: {
//     opacity: 0,
//     x: -50,
//     scale: 0.98,
//   },
//   visible: {
//     x: 0,
//     scale: 1,
//     opacity: 1,
//     transition: {
//       duration: 0.2,
//       delay: 0.02,
//       type: "spring",
//       stiffness: 100,
//       staggerChildren: 1,
//     },
//   },
// };

// export const adminProjectsVariants = {
//   hidden: {
//     opacity: 0,
//     x: 30,
//     scale: 0.9,
//   },
//   visible: {
//     x: 0,
//     scale: 1,
//     opacity: 1,
//     transition: {
//       duration: 1,
//       delay: 0.02,
//       type: "spring",
//       stiffness: 100,
//       staggerChildren: 1,
//     },
//   },
//   hover: {
//     scale: 1.01,
//     x: 4,
//     transition: { duration: 0.1, type: "spring", stiffness: 700 },
//   },
// };
