using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DuGlemmerDetAldrig.Data;
using System.Linq.Expressions;
using DuGlemmerDetAldrig.Entity;

namespace DuGlemmerDetAldrig.Repository
{
    // Products CRUD
    public class ProductRepository : IRepository<product>
    {
        private readonly ExamContext _DBContext;

        public ProductRepository()
        {
            _DBContext = new ExamContext();
        }

        public IQueryable<product> All()
        {
            return _DBContext.Set<product>();
        }

        public IQueryable<product> Get(int id)
        {
            var DBSet = _DBContext.Set<product>();

            return DBSet.Where(x=>x.id == id);
        }

        public bool Create(product entity)
        {
            try
            {
                var DBSet = _DBContext.Set<product>();

                DBSet.Add(entity);
                _DBContext.SaveChanges();

                return true;
            }catch(Exception e)
            {
                return false;
            }
        }

        public bool Delete(product entity)
        {
            try
            {
                var DBSet = _DBContext.Set<product>();
                DBSet.Remove(entity);
                _DBContext.SaveChanges();

                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public bool Update(product entity)
        {
            try
            {
                _DBContext.Entry(entity).State = System.Data.Entity.EntityState.Modified;
                _DBContext.SaveChanges();

                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }
    }
}
