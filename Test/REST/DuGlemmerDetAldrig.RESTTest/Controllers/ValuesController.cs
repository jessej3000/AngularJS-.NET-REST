using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

using DuGlemmerDetAldrig.Data;
using DuGlemmerDetAldrig.Entity;
using System.Web.Script.Serialization;
using DuGlemmerDetAldrig;
using DuGlemmerDetAldrig.Repository;

namespace DuGlemmerDetAldrig.RESTTest.Controllers
{
    public class ValuesController : ApiController
    {
        private IRepository<product> _repository;

        // Get all
        public HttpResponseMessage Get()
        {
            _repository = new ProductRepository();
            
            var productList = _repository.All().ToList();

            /*JavaScriptSerializer jss = new JavaScriptSerializer();

            var json = jss.Serialize(productList);
            return json;*/
            return Request.CreateResponse<IEnumerable<product>>(HttpStatusCode.OK, productList);
        }

        // Get specific
        public string Get(int id)
        {
            _repository = new ProductRepository();
            var productList = _repository.Get(id);
            //return Request.CreateResponse<IEnumerable<product>>(HttpStatusCode.OK, productList);
            JavaScriptSerializer jss = new JavaScriptSerializer();

            var json = jss.Serialize(productList);
            
            
            
            return json;
        }

        // Add record
        public string Post([FromBody]product Prod)
        {
            _repository = new ProductRepository();
            product Product = new product();

            Product.name = Prod.name;
            Product.description = Prod.description;
            Product.price = Prod.price;
            Product.instock = Prod.instock;

            string json = "";

            json = "[{'result':" + _repository.Create(Product).ToString() + "}]";

            return json;
        }

        // Update record
        public string Put(int id, [FromBody]product Prod)
        {
            _repository = new ProductRepository();
            var productList = _repository.Get(id).Single();

            string json = "";

            productList.name = Prod.name;
            productList.description = Prod.description;
            productList.price = Prod.price;
            productList.instock = Prod.instock;

            json = "[{'result':" + _repository.Update(productList) + "}]";

            return json;
        }

        // Delete record
        public string Delete(int id)
        {
            _repository = new ProductRepository();
            var productList = _repository.Get(id);

            string json = "";

            json = "[{'result':" + _repository.Delete(productList.Single()) + "}]";

            return json;
        }
    }
}