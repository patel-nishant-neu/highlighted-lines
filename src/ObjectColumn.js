import React from 'react';

const ObjectColumn = ({ id, objects }) => {
  return (
    <div className="flex flex-col gap-5" id={id}>
      {objects.map((object, index) => (
        <div key={index} className="object bg-blue-200 border border-black w-24 h-12 flex items-center justify-center" id={`object${object.split(' ')[1]}`}>
          {object}
        </div>
      ))}
    </div>
  );
};

export default ObjectColumn;
