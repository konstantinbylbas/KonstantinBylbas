/** @format */

import './Input.scss';

export default function Input({ value }: { value: string }) {
    return (
        <div className="input hoverable">
            <input type="text" defaultValue={value} />

            <div className="verticalPseudoElement"></div>
            <div className="horizontalPseudoElement"></div>
        </div>
    );
}
