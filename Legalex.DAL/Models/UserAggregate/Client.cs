﻿using System.ComponentModel.DataAnnotations;

namespace Legalex.DAL.Models.UserAggregate
{
    public enum ClientType
    {
        [Display(Name = "Физическое лицо")]
        Person,
        [Display(Name = "Юридическое лицо")]
        Legal
    }

    public class Client : User
    {
        public ClientType Type { get; set; }
    }
}
