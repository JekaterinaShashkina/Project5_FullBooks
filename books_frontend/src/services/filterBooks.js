export const filterBooks = (books, searchTerm='', categoryId=null) => {
    if (!Array.isArray(books)) return [];
    if (!searchTerm?.trim() && !categoryId) return books;
  
    return books.filter(book => {
      const matchesSearch =
        book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.authors?.some(author =>
          `${author.first_name} ${author.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        book.category?.name?.toLowerCase().includes(searchTerm.toLowerCase());
  
      const matchesCategory = categoryId ? book.category?.categoryId === categoryId : true;
  
      return matchesSearch && matchesCategory;
    });
  };
  