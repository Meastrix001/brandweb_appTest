type Props = {
    children: JSX.Element,
  };

function MainContainer({ children }: Props) {
return (
    <main className='bg-primary border-4 border-dark'>
        <div className='p-4 container'>
            {children}
        </div>
    </main>
 )
}
export default MainContainer