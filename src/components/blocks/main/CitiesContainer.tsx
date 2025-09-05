interface CitiesContainerProps {
  children: React.ReactNode;
}

const CitiesContainer = ({ children }: CitiesContainerProps) => {
  return <div className='cities'>{children}</div>;
};

export default CitiesContainer;
