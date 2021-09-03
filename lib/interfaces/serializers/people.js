const _serialize = (person) => {
  return {
    id_person: person.id_person,
    first_name: person.first_name,
    last_name: person.last_name
  };
};

function serialize(data) {
  if (!data) {
    throw new Error('Expect data to be not undefined nor null');
  }
  if (Array.isArray(data)) {
    return data.map(_serialize);
  }

  return _serialize(data);
}

export default serialize;
