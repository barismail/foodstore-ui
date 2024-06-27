import {node} from 'prop-types';

export default function IconWrapper({children}) {
    return (
        <div>
            {children}
        </div>
    )
}

IconWrapper.propTypes = {
    children: node.isRequired,
}