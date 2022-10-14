type Props = {
    children: JSX.Element,
  };

function MainContainer({ children }: Props) {
return (
    <main className='bg-primary border-4 border-dark'>
        <div>
            {children}
        </div>
    </main>
 )
}
export default MainContainer