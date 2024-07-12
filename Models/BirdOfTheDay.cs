using System;
using System.Collections.Generic;

namespace Birbs.Models
{
    public class BirdOfTheDay
    {
        public int Id { get; set; }
        public int BirdId { get; set; }
        public Bird Bird { get; set; }
        public string UserName { get; set; }
        public DateTime ChosenDate { get; set; }
    }
}