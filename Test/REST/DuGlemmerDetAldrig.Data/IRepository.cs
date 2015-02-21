using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Linq.Expressions;

namespace DuGlemmerDetAldrig.Data
{
    // CRUD Interface for repositories
    public interface IRepository<T>
    {
        IQueryable<T> All();

        IQueryable<T> Get(int id);

        bool Create(T entity);

        bool Delete(T entity);

        bool Update(T entity);

    }
}
