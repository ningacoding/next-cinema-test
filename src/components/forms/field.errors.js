import FlatList from 'flatlist-react';
import * as _keys from 'lodash.keys';

export default function FieldErrors({errors, styles, textStyle, name, simple}) {
    const errorList = getErrors(errors, name);
    if (!errorList) {
        return null;
    }
    return <div className={styles}>
        <FlatList list={errorList}
                  renderItem={(error, index) => <div
                      key={index}
                      className={`text-base text-red-600 ${!!simple ? '' : 'bg-red-100 border-l-2 border-red-600 p-1 my-1 pl-2'} ${textStyle || ''}`}>
                      {error}
                  </div>}
                  renderWhenEmpty={() => null}
        />
    </div>;

}

const getErrors = (errors, name) => {
    let errorList;
    if (name) {
        errorList = _keys(errors).filter(error => error === name).map(error => errors[error]);
    } else {
        errorList = _keys(errors).map(error => errors[error]);
    }
    if (!Array.isArray(errorList) || errorList.length < 1) {
        return null;
    }
    return errorList;
}
