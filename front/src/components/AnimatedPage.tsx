import { motion } from "framer-motion";
import React from "react";

const animations = {
    initial: { opacity: 0, x: 500 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 500 },
};

const AnimatedPage: React.FC<any> = ({ children }) => {
    return (
        <motion.div
            variants={animations}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.2 }}
            className="h-full" 
        >
            {children}
        </motion.div>
    );
}

export default AnimatedPage;