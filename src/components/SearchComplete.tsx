import React, { useState } from 'react';
import { AutoComplete, Input } from 'antd';
import type { AutoCompleteProps } from 'antd';

const getRandomInt = (max: number, min = 0) => Math.floor(Math.random() * (max - min + 1)) + min;

const searchResult = (query: string) =>
    Array.from({ length: getRandomInt(5) })
        .join('.')
        .split('.')
        .map((_, idx) => {
            const category = `${query}${idx}`;
            return {
                value: category,
                label: (
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
            <span>
              Found {query} on{' '}
                <a
                    href={`https://s.taobao.com/search?q=${query}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                {category}
              </a>
            </span>
                        <span>{getRandomInt(200, 100)} results</span>
                    </div>
                ),
            };
        });

interface SearchCompleteProps {
    placeholder: string;
    onSearch: (value: string) => void;  // Changed from onSearchExternal to onSearch
    "aria-label"?: string;
}

const SearchComplete: React.FC<SearchCompleteProps> = ({ 
    placeholder, 
    onSearch,
    "aria-label": ariaLabel 
}) => {
    const [options, setOptions] = useState<AutoCompleteProps['options']>([]);

    const handleSearch = (value: string) => {
        setOptions(value ? searchResult(value) : []);
        // Call the external onSearch handler to update parent component state
        onSearch(value);
    };

    const onSelect = (value: string) => {
        console.log('onSelect', value);
        // Also call onSearch when an option is selected
        onSearch(value);
    };

    return (
        <AutoComplete
            popupMatchSelectWidth={252}
            style={{ width: 300 }}
            options={options}
            onSelect={onSelect}
            onSearch={handleSearch}
            size="large"
            aria-label={ariaLabel}
        >
            <Input.Search size="large" placeholder={placeholder} enterButton />
        </AutoComplete>
    );
};

export default SearchComplete;