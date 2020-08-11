using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ReactCrudMvc.Models
{
    public partial class EmployeeMaster
    {
        public int EmpId { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public string EmailId { get; set; }
        public string Address { get; set; }
        
        public DateTime DateofBirth { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsDelete { get; set; }
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}", ApplyFormatInEditMode = true)]
        public DateTime Createdon { get; set; }
        public Guid CreatedBy { get; set; }
        public string Country { get; set; }
        public string State { get; set; }
        public string City { get; set; }
        //public int? ZipCode { get; set; }
    }
}
