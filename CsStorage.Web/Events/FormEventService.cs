using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CsStorage.Web.Events
{
    public class FormEventService
    {
        public event Action OnCashFormSubmitted;

        public void FormSubmitted()
        {
            OnCashFormSubmitted?.Invoke();
            
        }
    }
}