using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactCrudMvc.Models;

namespace ReactCrudMvc.Controllers
{
    [Route("api/EmployeeMasters")]
    [ApiController]
    //[EnableCors("AllowOrigin")]
    public class EmployeeMastersController : ControllerBase
    {
        private  ReactDbContext _context;

        public EmployeeMastersController(ReactDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("Get")]
        public object GetEmployeeMaster()
        {
            var emp= _context.EmployeeMaster.ToList();
            return emp;
        }


        [HttpGet]
        [Route("Details")]
        public object GetEmployeeMaster(int id)
        {
            var employeeMaster = _context.EmployeeMaster.Where(x => x.EmpId == id).ToList().FirstOrDefault();
            return employeeMaster;
        }


        [HttpPut]
        [Route("Update")]
        public object PutEmployeeMaster( EmployeeMaster employeeMaster)
        {
            var obj = _context.EmployeeMaster.Where(x => x.EmpId == employeeMaster.EmpId).FirstOrDefault();
            try
            {
                if (obj.EmpId > 0)
                {
                    //obj.EmpId = employeeMaster.EmpId;
                    obj.Name = employeeMaster.Name;
                    obj.Phone = employeeMaster.Phone;
                    obj.Address = employeeMaster.Address;
                    obj.Country = employeeMaster.Country;
                    obj.State = employeeMaster.State;
                    obj.City = employeeMaster.City;
                    //obj.ZipCode = employeeMaster.ZipCode;
                    obj.DateofBirth = employeeMaster.DateofBirth;
                    obj.IsActive = true;
                   // obj.Createdon = DateTime.Now;
                    //obj.CreatedBy = Guid.NewGuid();
                    _context.Entry(employeeMaster).State = EntityState.Modified;
                    _context.SaveChanges();
                }
            }
            catch (Exception e)
            {
                    throw e;
            }

            return employeeMaster;
        }

        
        [HttpPost]
        [Route("Create")]
        public int PostEmployeeMaster(EmployeeMaster employeeMaster)
        {
            try
            {
                employeeMaster.IsActive = true;
                employeeMaster.CreatedBy = Guid.NewGuid();
                employeeMaster.Createdon = DateTime.Now;
                _context.EmployeeMaster.Add(employeeMaster);
                _context.SaveChanges();
            }
            catch (Exception e)
            {
                throw e;
            }
            return employeeMaster.EmpId;
        }


        [HttpDelete]
        [Route("Delete")]
        public int DeleteEmployeeMaster(int id)
        {
           var employeeMaster = _context.EmployeeMaster.Find(id);
            try
            {
                EmployeeMaster emp = new EmployeeMaster();
                if (employeeMaster != null)
                {
                    emp.IsDelete = false;
                    _context.SaveChangesAsync();
                }
            }
            catch (Exception e)
            {
                throw e;
            }
            return employeeMaster.EmpId;
        }

        //private bool employeemasterexists(int id)
        //{
        //    return _context.employeemaster.any(e => e.empid == id);
        //}
    }
}
