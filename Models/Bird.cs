using System;
using System.ComponentModel.DataAnnotations;

namespace Birbs.Models
{
    public class Bird
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "You must provide a name for your bird")]
        public string Name { get; set; }
        public string PhotoURL { get; set; }
        public string PhotoPublicId { get; set; }
        public string PhotoFileName { get; set; }
        public string AdoptedFrom { get; set; }
        [Required(ErrorMessage = "You must provide a year for your bird")]
        public int YearPublished { get; set; }
        
        [Required(ErrorMessage = "You must provide a season for your bird")]
        public string SeasonCollection { get; set; }
        public string HolidayCollection { get; set; } 
        // Bird belongs to one user
        public int UserId { get; set; }
        public User User { get; set; }
    }
}