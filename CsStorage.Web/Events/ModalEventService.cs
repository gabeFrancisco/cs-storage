using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CsStorage.Web.Events
{
    public class ModalEventService
    {
        public event Func<Task> OnCashUpdatedModal;

        public void UpdateCashModal()
        {
            OnCashUpdatedModal.Invoke();
        }
    }
}