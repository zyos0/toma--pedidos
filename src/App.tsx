import React, { useEffect, useState } from 'react';
import './App.css';

interface ButtonProps {
    text?: string;
    handleOnClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, handleOnClick, children }) => {
    return <button onClick={handleOnClick}>{children || text}</button>;
};

interface ItemProps {
    label: string;
    handleDelete: (item: string) => void;
}

const Item: React.FC<ItemProps> = ({ label, handleDelete }) => {
    useEffect(() => {
        const timerId = setInterval(() => {
            console.log(`${label} salutes you!`);
        }, 2000);

        return () => window.clearInterval(timerId);
    }, [label]);

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-evenly',
                width: 350,
                margin: '0 auto',
            }}
        >
            <span>{label}</span>
            <Button handleOnClick={() => handleDelete(label)}>Remove</Button>
        </div>
    );
};

const ListingPage = () => {
    const blackList = ['ana', 'julia', 'juan'];

    const [name, setName] = useState('Maria');

    const [list, updateList] = useState<string[]>([]);

    useEffect(() => {
        if (blackList.some((entry) => entry === name)) {
            setName('');
        }
    });

    const handleUpdateList = (newEntry: string) => {
        const newList = list.concat(newEntry); // [...list, newEntry]
        setName('');
        updateList(newList);
    };

    const handleRemoveFromList = (target: string) => {
        const newList = list.filter((item) => item !== target);
        updateList(newList);
    };

    const handleNameUpdate = (evt: any) => {
        setName(evt.target.value);
    };

    const renderListEntry = (entry: string) => {
        return (
            <Item
                key={entry}
                label={entry}
                handleDelete={handleRemoveFromList}
            />
        );
    };

    return (
        <div>
            <input type="text" value={name} onChange={handleNameUpdate} />
            <Button
                text="Add new Entry"
                handleOnClick={() => handleUpdateList(name)}
            />

            <div>{list.map(renderListEntry)}</div>
        </div>
    );
};

function App() {
    return (
        <div className="App">
            <ListingPage />
        </div>
    );
}

export default App;
