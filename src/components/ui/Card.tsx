import { motion } from "framer-motion";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

const Card = ({ children, className = "", hoverEffect = true }: CardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={
        hoverEffect
          ? {
              scale: 1.02,
              boxShadow:
                "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }
          : {}
      }
      transition={{ duration: 0.3 }}
      className={`bg-white rounded-2xl shadow-lg overflow-hidden ${className}`}
    >
      {children}
    </motion.div>
  );
};

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

const CardHeader = ({ children, className = "" }: CardHeaderProps) => {
  return (
    <div className={`p-6 border-b border-gray-100 ${className}`}>
      {children}
    </div>
  );
};

interface CardBodyProps {
  children: ReactNode;
  className?: string;
}

const CardBody = ({ children, className = "" }: CardBodyProps) => {
  return <div className={`p-6 ${className}`}>{children}</div>;
};

interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

const CardFooter = ({ children, className = "" }: CardFooterProps) => {
  return (
    <div className={`p-6 border-t border-gray-100 ${className}`}>
      {children}
    </div>
  );
};

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;
