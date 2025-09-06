interface CitiesContainerProps {
  children: React.ReactNode;
}

export default function CitiesContainer({ children }: CitiesContainerProps) {
  return <div className='cities'>{children}</div>;
}
