import './styles.css'

export const TextInput = ({seachValue , handleChange}) => {
    return(
    <input
    className='text-input'
    onChange={handleChange}
    value={seachValue}
    placeholder='Type your search'
    type='search' />
)}