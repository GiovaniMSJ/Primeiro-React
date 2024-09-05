import { render , screen } from "@testing-library/react"
import { PostCard } from "."
import { postCardPropsMock } from "./mock"

const props = postCardPropsMock;

describe('<PostCard/>' , () => {
    it('Should render PostCard correctly', () => {
        render(<PostCard {...props} />);

        expect(screen.getByRole('img' , {name: props.title}))
            .toHaveAttribute('src', 'img/img.png');
        expect(screen.getByRole('heading' , {name: props.title})).toBeInTheDocument()
        expect(screen.getByText('body1')).toBeInTheDocument()
    })

    it('Should match snapshot', () => {
        const { container } =render(<PostCard {...props}/>);
        
        // eslint-disable-next-line testing-library/no-node-access
        expect(container.firstChild).toMatchSnapshot();
    })
})