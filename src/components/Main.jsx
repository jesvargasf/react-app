function Main(props) {
    return <main>

        <h1>{props.titulo} {props.contador}</h1>

        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Inventore, officiis magni. Ab laborum debitis nobis obcaecati, facere aliquid explicabo excepturi optio eligendi dolores perspiciatis doloremque. Blanditiis nisi laboriosam tempora voluptatum.</p>

        <button onClick={props.aumentar}>Aumentar {props.contador}</button>

    </main>
}

export default Main;