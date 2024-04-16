using System;
using System.ComponentModel.DataAnnotations;

namespace TacoTuesday.Models
{
    public class Bird
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string AdoptedFrom { get; set; }
        public Date YearPublished { get; set; }
        public string SeasonCollection { get; set; }
        public string HolidayCollection { get; set; } 
        // Bird image here
        // Bird belongs to one user
        public int UserId { get; set; }
        public User User { get; set; }
    }
}